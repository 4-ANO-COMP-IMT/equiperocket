import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:front_flutter/pages/logInPage.dart';
import 'package:front_flutter/pages/profilePage.dart';
import 'package:front_flutter/pages/signUpPage.dart';
import 'package:front_flutter/pages/sign_up_page_restaurant.dart';
import 'package:provider/provider.dart';
import 'package:front_flutter/pages/restaurantPage.dart';
import 'dart:html' as html;
import 'package:front_flutter/components/navbar.dart';
import 'package:front_flutter/pages/home_page.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => MyAppState(),
      child: MaterialApp(
        title: 'Flutter Front',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepOrange),
        ),
        home: MyHomePage(),
      ),
    );
  }
}

class MyAppState extends ChangeNotifier {
  
}

class MyHomePage extends StatefulWidget {
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  bool isLogged = false;
  var selectedIndex = 0;

  @override
  void initState() {
    super.initState();
    _checkLoginStatus();
  }

  Future<void> _checkLoginStatus() async {
    if (kIsWeb) {
      final token = html.window.localStorage['user_token'];
      setState(() {
        isLogged = token != null;
      });
    } else {
      final storage = FlutterSecureStorage();
      final token = await storage.read(key: 'user_token');
      setState(() {
        isLogged = token != null;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    Widget page;
    switch (selectedIndex) {
      case 0:
        page = HomePage();
        break;
      case 1:
        page = isLogged ? ProfilePage() : LoginPage();
        break;
      case 2:
        page = RestaurantPage();
        break;
      case 3:
        page = SignUpPage();
        break;
      case 4:
        page = SignUpResPage();
        break;
      default:
        throw UnimplementedError('no widget for $selectedIndex');
    }

    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter Front'),
      ),
      drawer: Navbar(), // Aqui usamos o Navbar como o drawer
      body: Center(
        child: page,
      ),
    );
  }
}
