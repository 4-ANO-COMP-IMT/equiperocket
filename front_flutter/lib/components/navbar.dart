import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:front_flutter/pages/logInPage.dart';
import 'package:front_flutter/pages/profilePage.dart';
import 'package:front_flutter/pages/signUpPage.dart';
import 'package:front_flutter/pages/restaurantPage.dart';
import 'package:front_flutter/pages/sign_up_page_restaurant.dart';
import 'dart:html' as html;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:front_flutter/pages/restaurantControllPage.dart';

class Navbar extends StatefulWidget {
  const Navbar({super.key});

  @override
  State<Navbar> createState() => _NavbarState();
}

class _NavbarState extends State<Navbar> {
  bool isLogged = false;
  String userType = ' ';

  @override
  void initState() {
    super.initState();
    _checkLoginStatus();
  }

  Future<void> _checkLoginStatus() async {
    if (kIsWeb) {
      final token = html.window.localStorage['user_token'];
      final type = html.window.localStorage['user_type'];
      setState(() {
        isLogged = token != null;
        userType = type ?? '';
      });
    } else {
      final storage = FlutterSecureStorage();
      final token = await storage.read(key: 'user_token');
      final type = await storage.read(key: 'user_type');
      setState(() {
        isLogged = token != null;
        userType = type ?? '';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: const BoxDecoration(
              color: Colors.blue,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Text(
                  'Menu',
                  style: TextStyle(color: Colors.white, fontSize: 24),
                ),
              ],
            ),
          ),
          ListTile(
            leading: const Icon(Icons.home),
            title: const Text('Home'),
            onTap: () {
              Navigator.pushNamed(context, '/');
            },
          ),
          ListTile(
            leading: Icon(isLogged ? Icons.person : Icons.login),
            title: Text(isLogged ? 'Profile' : 'Login'),
            onTap: () {
              Navigator.pop(context);
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) =>
                        isLogged ? ProfilePage() : LoginPage()),
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
          if (isLogged == false)
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
          if (isLogged == false)
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
          if (userType == 'restaurant')
            ListTile(
              leading: Icon(Icons.restaurant),
              title: Text('Gerenciar Restaurantes'),
              onTap: () {
                Navigator.pop(context); // Fecha o Drawer
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => Restaurantcontrollpage()),
                );
              },
            )
        ],
      ),
    );
  }
}
