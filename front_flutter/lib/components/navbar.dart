import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:front_flutter/pages/logInPage.dart';
import 'package:front_flutter/pages/profilePage.dart';
import 'package:front_flutter/pages/signUpPage.dart';
import 'package:front_flutter/pages/restaurantPage.dart';
import 'package:front_flutter/pages/sign_up_page_restaurant.dart';
import 'dart:html' as html; 
import 'package:flutter_secure_storage/flutter_secure_storage.dart';




class Navbar extends StatefulWidget {
  const Navbar({super.key});

  @override
  _NavbarState createState() => _NavbarState();
}

class _NavbarState extends State<Navbar> {
  bool isLogged = false; 

  @override
  void initState() {
    super.initState();
    _checkLoginStatus();
  }
  Future<void> _checkLoginStatus() async {
    if(kIsWeb){
      final token = html.window.localStorage['user_token'];
      setState(() {
        isLogged = token != null;
      });
    }else{
      final storage = FlutterSecureStorage();
      final token = await storage.read(key: 'user_token');
      setState(() {
        isLogged = token != null;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
          padding: EdgeInsets.zero,
          children: [
            const DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.deepOrange,
              ),
              child: Text('Menu', style: TextStyle(color: Colors.white, fontSize: 24)),
            ),
            ListTile(
              title: const Text('Home'),
              onTap: () {
                Navigator.pushNamed(context, '/');
              },
            ),
            ListTile(
              leading: Icon(isLogged ? Icons.person : Icons.login),
              title: Text(isLogged ? 'Profile' : 'Login'),
              onTap:() {
                Navigator.pop(context);
                  Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => isLogged ? ProfilePage() : LoginPage()),
                );
              },
            ),
            ListTile(
              leading: Icon(Icons.restaurant),
              title: Text('Restaurantes'),
              onTap: () {
                Navigator.pop(context); // Fecha o Drawer
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => RestaurantPage()),
                );
              },
            ),
            ListTile(
              leading: Icon(Icons.person_add),
              title: Text('Cadastro'),
              onTap: () {
                Navigator.pop(context); // Fecha o Drawer
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => SignUpPage()),
                );
              },
            ),
             ListTile(
            leading: Icon(Icons.restaurant_menu),
            title: Text('Cadastro Restaurante'),
            onTap: () {
              Navigator.pop(context); // Fecha o Drawer
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => SignUpResPage()),
              );
            },
          ),
        ],
      ),
    );
  }
}


