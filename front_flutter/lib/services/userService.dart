import 'dart:convert';
import 'package:http/http.dart' as http;  

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
  Future<LoginAlbum> fetchAlbum() async {
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
      return LoginAlbum.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to load album');
    }
  }
}


class RestaurantUserAlbum {

}

class UserAlbum {

}