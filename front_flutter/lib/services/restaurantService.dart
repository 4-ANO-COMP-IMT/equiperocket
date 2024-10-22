import 'dart:convert';
import 'package:http/http.dart' as http;

class Restaurantservice {
  static const String baseUrl = "http://localhost:30002";

  Future<List<dynamic>> getRestaurants() async {
    try{
      final response = await http.post(Uri.parse("$baseUrl/restaurants"));
      if(response.statusCode == 200){
        final result = jsonDecode(response.body);
        return result;
      }else{
        throw Exception("Failed to load restaurants: ${response.statusCode}");
      }
    }catch(e){
      print(e);
      throw Exception("Failed to load restaurants");
    }
  }

  Future<List<dynamic>> getNearbyRestaurants(double lat, double long, double rad) async {
    try{
      final params = {
        'lat': lat.toString(),
        'long': long.toString(),
        'rad': rad.toString(),
      };
      final response = await http.get(
        Uri.parse('$baseUrl/restaurants/nearby/?${Uri(queryParameters: params).query}'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },

      );
      if(response.statusCode == 200){
        List<dynamic> data = jsonDecode(response.body);
        return data;
      }else{
        throw Exception("Failed to load nearby restaurants: ${response.statusCode}");
      }
    }catch(e){
      print(e);
      throw Exception("Failed to load nearby restaurants");
    }
  }

  Future<void> updateOccupancy(String restaurantId, int occupancy) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/restaurants/$restaurantId/occupancy'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode({
          'currentOccupancy': occupancy,
        }),
      );

      if (response.statusCode == 200) {
        print("Ocupação atualizada com sucesso!");
      } else {
        throw Exception('Erro ao atualizar a ocupação: ${response.statusCode}');
      }
    } catch (error) {
      print('Erro ao atualizar a ocupação: $error');
    }
  }
}