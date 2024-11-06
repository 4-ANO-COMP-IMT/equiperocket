import 'package:flutter/material.dart';
import 'package:front_flutter/services/locationService.dart';
import 'package:front_flutter/services/restaurantService.dart';
import 'package:front_flutter/components/occupancy_info.dart';
import 'package:front_flutter/components/home_button_group.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<dynamic> restaurants = [];
  bool loading = true;
  String? error;

  Future<void> fetchRestaurants() async {
    setState(() {
      loading = true;
      error = null;
    });
    try {
      final location = await getLocation();
      final response = await getNearby(location.latitude, location.longitude, 5000);

      if (response == null) {
        throw Exception("Erro ao buscar restaurantes");
      }
      if (response.isEmpty) {
        throw Exception("Nenhum restaurante encontrado");
      }

      setState(() {
        restaurants = response;
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
              HomeButtonGroup(onUpdate: updateOccupancyData),
              const SizedBox(height: 30),
              loading
                  ? CircularProgressIndicator(color: Colors.white)
                  : OccupancyInfo(occupancyData: restaurants),
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
