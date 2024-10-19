import 'package:flutter/material.dart';
import 'package:front_flutter/model/user.dart';


class ProfilePage extends StatefulWidget {
  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  @override
  Widget build(BuildContext context) {
    final user = User(name: 'name', email: 'email', cpf: 'cpf');
    return Scaffold(
      appBar: AppBar(
        title: Text('Profile'),
      ),
      body: ListView(
        physics: BouncingScrollPhysics(),
        children: [
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                Card(
                  child: Column(
                    children: [
                      Text('Name: ${user.name}'),
                      Text('Email: ${user.email}'),
                      Text('CPF: ${user.cpf}'),
                    ],
                  )),
              ],
            ),
          ),
        ]
      ),
    );
  }
}