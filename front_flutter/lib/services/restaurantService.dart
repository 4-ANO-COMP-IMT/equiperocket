import 'dart:convert';
import 'package:http/http.dart' as http;

class Restaurantservice {
  static const String baseUrl = "http://localhost:30002";

  Future<List<dynamic>> getRestaurants() async {
    try {
      final response = await http.post(Uri.parse("$baseUrl/restaurants"));
      if (response.statusCode == 200) {
        final result = jsonDecode(response.body);
        return result;
      } else {
        throw Exception("Failed to load restaurants: ${response.statusCode}");
      }
    } catch (e) {
      print(e);
      throw Exception("Failed to load restaurants");
    }
  }

  Future<List<dynamic>> getNearbyRestaurants(
      double lat, double long, double rad) async {
    try {

      final params = {
        'lat': lat.toString(),
        'long': long.toString(),
        'rad': rad.toString(),
      };
   
      final response = await http.get(
        Uri.parse(
            '$baseUrl/restaurants/nearby/?${Uri(queryParameters: params).query}'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      if (response.statusCode == 200) {
        List<dynamic> data = jsonDecode(response.body);
        return data;
      } else {
        throw Exception(
            "Failed to load nearby restaurants: ${response.statusCode}");
      }
    } catch (e) {
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

  Future<Map<String, dynamic>> getRestaurantsByCNPJ(String cnpj) async {
  try {
    final response = await http.post(
      Uri.parse("$baseUrl/restaurants/cnpj"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'cnpj': cnpj,
      }),
    );

    if (response.statusCode == 200) {
      final result = jsonDecode(response.body);
      return result;
    } else if (response.statusCode == 404) {
      return {'error': 'Restaurante não encontrado com esse CNPJ'};
    } else {
      print(jsonDecode(response.body));
      throw Exception("Failed to load restaurants: ${response.statusCode}");
    }
  } catch (e) {
    print(e);
    throw Exception("Failed to load restaurants");
  }
}

  Future<void> addRestaurant(Map<String, dynamic> restaurantData) async {
    try {
      final response = await http.post(Uri.parse("$baseUrl/restaurants/add"),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode(restaurantData));
      if (response.statusCode == 200) {
        final result = jsonDecode(response.body);
        print("Restaurante cadastrado com sucesso: $result");
      } else {
        throw Exception(
            "Erro ao cadastrar restaurante: ${response.statusCode} : ${jsonDecode(response.body)['error']}");
      }
    } catch (e) {
      print("Erro: $e");
      throw Exception("Erro ao cadastrar restaurante");
    }
  }
}
