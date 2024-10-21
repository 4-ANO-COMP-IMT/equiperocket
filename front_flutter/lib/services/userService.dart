import 'dart:convert';
import 'package:http/http.dart' as http;  
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class LoginResponse {
  final String token;
  final String name;

  const LoginResponse({
    required this.token,
    required this.name,
  });

  factory LoginResponse.fromJson(Map<String, dynamic> json) {
    return LoginResponse(
      token: json['token'],
      name: json['name'],
    );
  }
}
class LoginAlbum {
  final String email;
  final String password;

  const LoginAlbum({
    required this.email,
    required this.password,
  });
  
  factory LoginAlbum.fromJson(Map<String, dynamic> json) {
    return LoginAlbum(
      email: json['email'],
      password: json['password'],
    );
  }
  Future<String?> singIn() async {
    try{
      final response = await http.post(
        Uri.parse('http://localhost:30001/sign-in'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'email': email,
          'password': password,
        }),
      );
      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        final loginResponse = LoginResponse.fromJson(responseData);

        const storage = FlutterSecureStorage();
        await storage.write(key: 'user_token', value: loginResponse.token);
        return null;
      } else {
        throw Exception(jsonDecode(response.body)['message'] ?? 'Erro ao fazer o login');
      }
    }catch(e){
      return "Erro ao fazer o login: $e";
    }
    
  }
}


class RestaurantUserAlbum {

}

class UserAlbum {

}