import 'dart:convert';
import 'dart:html' as html;
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:front_flutter/pages/add_restaurant_page.dart';
import 'package:front_flutter/services/restaurantService.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class Restaurantcontrollpage extends StatefulWidget {
  const Restaurantcontrollpage({super.key});
  @override
  State<Restaurantcontrollpage> createState() => _RestaurantcontrollpageState();
}

class _RestaurantcontrollpageState extends State<Restaurantcontrollpage> {
  bool isLoading = true;
  List<Map<String, dynamic>> restaurants = [];
  String? error;

  @override
  void initState() {
    super.initState();
    loadRestaurants();
  }

  void loadRestaurants() async {
    try {
      final service = Restaurantservice();
      final cnpj = await getCNPJ();
      if (cnpj == null) {
        throw Exception("Failed to load user token");
      }
      final data = await service.getRestaurantsByCNPJ(cnpj);

      if (data.containsKey('error')) {
        setState(() {
          error = data['error'];
          isLoading = false;
        });
      } else if (data.containsKey('restaurants') &&
          data['restaurants'] is List) {
        setState(() {
          restaurants = List<Map<String, dynamic>>.from(data['restaurants']);
          isLoading = false;
        });
      } else {
        throw Exception("Formato inesperado de resposta do servidor");
      }
    } catch (e) {
      setState(() {
        error = e.toString();
        isLoading = false;
      });
    }
  }

  Future<String?> getCNPJ() async {
    try {
      if (kIsWeb) {
        final data = html.window.localStorage['user_token'];
        if (data != null) {
          final token = jsonDecode(data);
          Map<String, dynamic> json = JwtDecoder.decode(token['token']);
          print(json['cpfCnpj']);
          return json['cpfCnpj']!; // Asegura que o valor não seja nulo
        } else {
          throw Exception("Failed to load user token");
        }
      } else {
        final storage = FlutterSecureStorage();
        final data = await storage.read(key: 'user_token');
        if (data != null) {
          final token = jsonDecode(data);
          Map<String, dynamic> json = JwtDecoder.decode(token['token']);
          return json['cpfCnpj']!; // Asegura que o valor não seja nulo
        } else {
          throw Exception("Failed to load user token");
        }
      }
    } catch (e) {
      print(e);
      return null;
    }
  }

  void updateOccupancy(String cnpj, String nome, int newOccupancy) async {
    try {
      final service = Restaurantservice();
      print('CNPJ: $cnpj, Nome: $nome, Ocupação: $newOccupancy');
      await service.updateOccupancy(cnpj, nome, newOccupancy);
      loadRestaurants();
    } catch (e) {
      setState(() {
        error = "Erro ao atualizar a ocupação: $e";
      });
    }
  }

  void showUpdateOccupancyDialog(
      String cnpj, String nome, int currentOccupancy) {
    final TextEditingController occupancyController =
        TextEditingController(text: currentOccupancy.toString());

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text("Atualizar Ocupação"),
          content: TextField(
            controller: occupancyController,
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(labelText: "Nova ocupação"),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text("Cancelar"),
            ),
            TextButton(
              onPressed: () {
                final newOccupancy = int.tryParse(occupancyController.text);
                if (newOccupancy != null) {
                  updateOccupancy(
                      cnpj, nome, newOccupancy); // Passa cnpj e nome agora
                  Navigator.pop(context);
                }
              },
              child: const Text("Atualizar"),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Gerenciar Restaurantes"),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => AddRestaurantPage()),
              );
            },
          ),
        ],
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : error != null
              ? Center(child: Text(error!))
              : ListView.builder(
                  itemCount: restaurants.length,
                  itemBuilder: (context, index) {
                    final restaurant = restaurants[index];
                    return Card(
                      child: ListTile(
                        title: Text(restaurant['name'] ?? 'Sem nome'),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                                "Categoria: ${restaurant['category'] ?? 'N/A'}"),
                            Text("Endereço: ${restaurant['address'] ?? 'N/A'}"),
                            Text("CEP: ${restaurant['cep'] ?? 'N/A'}"),
                            Text(
                                "Ocupação Atual: ${restaurant['atualOcupancy'] ?? 'N/A'}"),
                            Text(
                                "Ocupação Máxima: ${restaurant['maxOcupancy'] ?? 'N/A'}"),
                          ],
                        ),
                        trailing: ElevatedButton(
                          onPressed: () {
                            showUpdateOccupancyDialog(
                              restaurant['CNPJ'] ?? '', // Passando CNPJ
                              restaurant['name'] ?? '', // Passando nome
                              restaurant['currentOccupancy'] ?? 0,
                            );
                          },
                          child: const Text("Atualizar Ocupação"),
                        ),
                      ),
                    );
                  },
                ),
    );
  }
}
