// lib/pages/home_page.dart

import 'package:flutter/material.dart';
// ignore: library_prefixes
import 'package:front_flutter/services/locationService.dart' as LocationService;
// ignore: library_prefixes
import 'package:front_flutter/services/restaurantService.dart' as RestaurantService;
import 'package:front_flutter/components/occupancy_info.dart';
import 'package:front_flutter/components/home_button_group.dart';

class HomePage extends StatefulWidget {
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<Map<String, dynamic>> restaurants = [];
  bool loading = true;
  String? error;

  Future<void> fetchRestaurants() async {
    setState(() {
      loading = true;
      error = null;
    });
    try {
      final service = RestaurantService.Restaurantservice(); 
      final location = await LocationService.LocationService().getLocation();
      final latitude = location['latitude'];
      final longitude = location['longitude'];
      print('Latitude: $latitude, Longitude: $longitude');
      final response = await service.getNearbyRestaurants(latitude, longitude, 5000);

      if (response.isEmpty) {
        throw Exception("Nenhum restaurante encontrado");
      }

      // Tratar dados para garantir que não existam valores null onde não deveriam
      final sanitizedRestaurants = response.map<Map<String, dynamic>>((restaurant) {
        return {
          'name': restaurant['name'] ?? 'Nome desconhecido',
          'category': restaurant['category'] ?? 'Categoria desconhecida',
          'address': restaurant['address'] ?? 'Endereço desconhecido',
          'currentOccupancy': restaurant['currentOccupancy'] ?? 0,
          'maxOccupancy': restaurant['maxOccupancy'] ?? 0,
        };
      }).toList();

      setState(() {
        restaurants = sanitizedRestaurants;
      });
    } catch (e) {
      setState(() {
        error = e.toString();
      });
    } finally {
      setState(() {
        loading = false;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    fetchRestaurants();
  }

  void updateOccupancyData() {
    fetchRestaurants();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff002F52),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                'Verifique a Lotação dos Restaurantes',
                style: TextStyle(
                  fontSize: 36,
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 20),
              Text(
                'Veja a ocupação em tempo real e escolha o melhor momento para sua visita.',
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.white70,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 30),
              ButtonGroup(onUpdate: updateOccupancyData),
              const SizedBox(height: 30),
              loading
                  ? CircularProgressIndicator(color: Colors.white)
                  : OccupancyInfo(
                      occupancyData: restaurants,
                      loading: loading,
                    ),
              if (error != null)
                Padding(
                  padding: const EdgeInsets.only(top: 20),
                  child: Text(
                    'Erro ao carregar os dados: $error',
                    style: TextStyle(color: Colors.red, fontSize: 16),
                    textAlign: TextAlign.center,
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
