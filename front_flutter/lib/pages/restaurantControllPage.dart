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
      if(data.containsKey('error')){
        setState(() {
          error = data['error'];
          isLoading = false;
          return;
        });
      }else{
        setState(() {
          restaurants = data['restaurants'];
          isLoading = false;
        });
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
          return json['cpfCnpj'];
        } else if (data == null) {
          throw Exception("Failed to load user ");
        }
      } else {
        final storage = FlutterSecureStorage();
        final data = await storage.read(key: 'user_token');
        if (data != null) {
          final token = jsonDecode(data);
          Map<String, dynamic> json = JwtDecoder.decode(token['token']);
          return json['cpfCnpj'];
        } else if (data == null) {
          throw Exception("Failed to load user token");
        }
      }
    } catch (e) {
      print(e);
      return null;
    }
    return null;
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
                        title: Text(restaurant['name']),
                        subtitle: Text("Categoria: ${restaurant['category']}"),
                        trailing: IconButton(
                          icon: const Icon(Icons.edit),
                          onPressed: () {
                            // Navigator.push(
                            //   context,
                            //   MaterialPageRoute(
                            //     builder: (context) => EditRestaurantPage(
                            //       restaurantId: restaurant['id'],
                            //     ),
                            //   ),
                            // );
                          },
                        ),
                      ),
                    );
                  },
                ),
    );
  }
}
