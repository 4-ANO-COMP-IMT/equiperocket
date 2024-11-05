import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:front_flutter/services/restaurantService.dart'; 

class Restaurantcontrollpage extends StatefulWidget {
  const Restaurantcontrollpage({super.key});
  @override
  _RestaurantcontrollpageState createState() => _RestaurantcontrollpageState();
}

class _RestaurantcontrollpageState extends State<Restaurantcontrollpage>{
  bool isLoading = true;
  List<dynamic> restaurants = [];
  String? error;

  @override
  void initState() {
    super.initState();
    loadRestaurants();
  }
  
  void loadRestaurants() async {
    try{
      final service = Restaurantservice();
      final cnpj = await getCNPJ();
      if(cnpj == null){
        throw Exception("Failed to load user token");
      }
      final data = await service.getRestaurantsByCNPJ(cnpj);
      setState(() {
        restaurants = data;
        isLoading = false;
      });
    }catch(e){
      setState(() {
        error = e.toString();
        isLoading = false;
      });
    }
  }
  Future<String?> getCNPJ() async {
    final storage = FlutterSecureStorage();
    try{
      final data = await storage.read(key: 'user_token');
      if(data != null){
        final json = jsonDecode(data);
        return json['cnpj'];
      }if(data == null){
        throw Exception("Failed to load user token");
      }
    }catch(e){
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
              // Navigator.push(
              //   context,
              //   MaterialPageRoute(builder: (context) => AddRestaurantPage()),
              // );
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