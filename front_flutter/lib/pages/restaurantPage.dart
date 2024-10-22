import 'package:flutter/material.dart';
import 'package:front_flutter/services/restaurantService.dart' as RestaurantService; 
class RestaurantPage extends StatefulWidget {
  @override
  _RestaurantPageState createState() => _RestaurantPageState();
}
class _RestaurantPageState extends State<RestaurantPage> {
  List<dynamic> restaurants = [];
  bool isLoading = true;
  String? error;

  @override
  void initState() {
    super.initState();
    fetchRestaurants(); 
  }

  Future<void> fetchRestaurants() async {
    try {
      final service = RestaurantService.Restaurantservice(); 
      final result = await service.getRestaurants();
      setState(() {
        restaurants = result;
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        error = e.toString();
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Restaurantes Próximos'),
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : error != null
              ? Center(child: Text('Erro: $error'))
              : restaurants.isEmpty
                  ? Center(child: Text('Nenhum restaurante encontrado.'))
                  : ListView.builder(
                      itemCount: restaurants.length,
                      itemBuilder: (context, index) {
                        final restaurant = restaurants[index];
                        return RestaurantCard(restaurant: restaurant);
                      },
                    ),
    );
  }
}

class RestaurantCard extends StatelessWidget {
  final dynamic restaurant;

  RestaurantCard({required this.restaurant});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.all(10),
      child: Padding(
        padding: EdgeInsets.all(15),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              restaurant['name'] ?? 'Nome desconhecido',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 10),
            Text(
              restaurant['address'] ?? 'Endereço desconhecido',
              style: TextStyle(fontSize: 16, color: Colors.grey[600]),
            ),
          ],
        ),
      ),
    );
  }
}