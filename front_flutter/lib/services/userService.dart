import 'dart:convert';
import 'package:http/http.dart' as http;  
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class LoginResponse {
  final String token;
  final String name;
  final String type;

  const LoginResponse({
    required this.token,
    required this.name,
    required this.type,
  });

  factory LoginResponse.fromJson(Map<String, dynamic> json) {
    return LoginResponse(
      token: json['token'],
      name: json['name'],
      type: json['type'],
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

class SignUpAlbum {
  final String name;
  final String email;
  final String password;
  final String cpf;
  final String cnpj;

  const SignUpAlbum({
    required this.name,
    required this.email,
    required this.password,
    required this.cpf,
    required this.cnpj,
  });

  Future<String?> signUp() async{
    try {
      final response = await http.post(
        Uri.parse('http://localhost:30003/sign-up'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'name': name,
          'email': email,
          'password': password,
          'cpf': cpf,
        }),
      );
      if (response.statusCode == 200) {
        return null;
      } else {
        final Map<String, dynamic> responseBody = jsonDecode(response.body);
        return responseBody['message'] ?? 'Erro ao cadastrar usuário';
      }
        
    } catch (e) {
      return "Erro ao fazer o cadastro: $e";
    }
  } 
  Future<String?> signUpRestaurant() async{
    try {
      final response = await http.post(
        Uri.parse('http://localhost:30003/sign-up-restaurant'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'name': name,
          'email': email,
          'password': password,
          'cnpj': cnpj,
        }),
      );
      if (response.statusCode == 200) {
        return null;
      } else {
        final Map<String, dynamic> responseBody = jsonDecode(response.body);
        return responseBody['message'] ?? 'Erro ao cadastrar usuário';
      }
        
    } catch (e) {
      return "Erro ao fazer o cadastro: $e";
    }
  }
}