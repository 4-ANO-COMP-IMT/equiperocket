import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:front_flutter/services/restaurantService.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'dart:html' as html;
class AddRestaurantPage extends StatefulWidget {
  @override
  State<AddRestaurantPage> createState() => _AddRestaurantPageState();
}

class _AddRestaurantPageState extends State<AddRestaurantPage> {
  final nameController = TextEditingController();
  final categoryController = TextEditingController();
  final cepController = TextEditingController();
  final maxOcupancyController = TextEditingController();
  final numberController = TextEditingController();
  final branchNameController = TextEditingController();
  String? cnpj;
  String? error = " ";

  Future<void> handleAddRestaurant() async {
  final name = nameController.text;
  final category = categoryController.text;
  final cep = cepController.text;
  final branchName = branchNameController.text;

 
  if (name.isEmpty ||
      category.isEmpty ||
      cep.isEmpty ||
      branchName.isEmpty) {
    setState(() {
      error = "Preencha todos os campos!";
    });
    return;
  }

  int? maxOcupancy;
  int? number;

  try {
    maxOcupancy = int.tryParse(maxOcupancyController.text);
    number = int.tryParse(numberController.text);
  } catch (e) {
    setState(() {
      error = 'Erro ao converter valores numéricos';
    });
    return;
  }

  
  if (maxOcupancy == null || maxOcupancy == 0 || number == null || number == 0) {
    setState(() {
      error = "Capacidade e número devem ser valores válidos!";
    });
    return;
  }

  try {
    if(kIsWeb){
       final data = html.window.localStorage['user_token'];
      if (data != null) {
        final token = jsonDecode(data);
        Map<String, dynamic> json = JwtDecoder.decode(token['token']);
        cnpj = json['cpfCnpj'];
        print(cnpj);
      } else if (data == null) {
        throw Exception("Failed to load user ");
      }
    }else{
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
    final restaurantData = {
      'name': name,
      'category': category,
      'cep': cep,
      'maxOcupancy': maxOcupancy,
      'number': number,
      'branchName': branchName,
      'cnpj': cnpj,
    };
    print(restaurantData);
    
    final service = Restaurantservice();
    await service.addRestaurant(restaurantData);
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Restaurante cadastrado com sucesso!')),
      );
      Navigator.pop(context);
    }
  } catch (e) {
    setState(() {
      error = 'Erro ao cadastrar restaurante: $e';
    });
  }
}


  @override
  Widget build(BuildContext context) {
    return Scaffold(
       appBar: AppBar(
        title: Text('Adicionar Restaurante'),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(
              controller: nameController,
              decoration: InputDecoration(labelText: 'Nome'),
            ),
             TextField(
              controller: categoryController,
              decoration: InputDecoration(labelText: 'Categoria'),
            ),
            TextField(
              controller: cepController,
              decoration: InputDecoration(labelText: 'CEP'),
            ),
            TextField(
              controller: maxOcupancyController,
              decoration: InputDecoration(labelText: 'Capacidade Máxima'),
              keyboardType: TextInputType.number,
            ),
            TextField(
              controller: numberController,
              decoration: InputDecoration(labelText: 'Número'),
              keyboardType: TextInputType.number,
            ),
            TextField(
              controller: branchNameController,
              decoration: InputDecoration(labelText: 'Nome da Filial'),
            ),
            if (error!.isNotEmpty)
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 8.0),
                child: Text(
                  error!,
                  style: TextStyle(color: Colors.red),
                ),
              ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: handleAddRestaurant,
              child: Text('Cadastrar Restaurante'),
            ),
          ],
        ),
      )
    );
  }
}
