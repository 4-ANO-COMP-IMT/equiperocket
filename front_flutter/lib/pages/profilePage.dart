import 'package:flutter/material.dart';
import 'package:front_flutter/components/profileMenuWidget.dart';
import 'package:front_flutter/model/user.dart';
import 'package:front_flutter/pages/logInPage.dart';
import 'package:front_flutter/services/userService.dart';
import 'package:line_awesome_flutter/line_awesome_flutter.dart';



class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});
  @override
    State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  Map<String, dynamic> userProfile = {};
  bool isLoading = true;
  
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _fetchUserData();
  }

  Future<void> _fetchUserData() async {
    try {
      final userService = UserAlbum();
      final userData = await userService.getUser();


      if (userData != null && mounted) {
        setState(() {
          userProfile = userData;
          isLoading = false;
        });
      } else {
        setState(() {
          isLoading = false;
        });

        
        if (mounted) {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => LoginPage()), 
          );
        }

        throw Exception('Erro ao buscar dados do usuário');
      }
    } catch (e) {
      print("Erro ao buscar dados do usuário: $e");
    }
  }
  Future<void>logOut() async {
    final logOut = LogOut();
    await logOut.logOut();
    // Redireciona para a página de login, removendo todas as rotas anteriores
    if (mounted) {
  Navigator.pushAndRemoveUntil(
    context,
    MaterialPageRoute(builder: (context) => LoginPage()),
    (Route<dynamic> route) => false, // Remove todas as rotas anteriores
  );
}
  }

  @override
  Widget build(BuildContext context) {
    final user = User(
      name: userProfile['name'] ?? '' ,
      email: userProfile['email'] ??'',
      cpf:  userProfile['cpf'] ?? '',
    );

   return Scaffold(
      body: Container(
        padding: const EdgeInsets.all(20.0),
        color: const Color(0xFFF8F9FA), // Cor de fundo
        child: Center(
          child: Container(
            padding: const EdgeInsets.all(20.0),
            decoration: BoxDecoration(
              color: const Color(0xFF171412), // Cor de fundo do card
              borderRadius: BorderRadius.circular(10),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.1),
                  blurRadius: 8.0,
                  offset: const Offset(0, 4), // Sombra abaixo do card
                ),
              ],
            ),
            constraints: BoxConstraints(maxWidth: 400, minWidth: 300), // Largura máxima do card
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                CircleAvatar(
                  radius: 60,
                  backgroundColor: Colors.grey,
                  child: Icon(
                    Icons.person,
                    color: Colors.white,
                    size: 60,
                  ),
                ),
                const SizedBox(height: 20),
                Text(
                  'Perfil do Usuário',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        color: const Color(0xFFDCDCDC),
                      ),
                ),
                const SizedBox(height: 20),
                _buildLabel('Nome:'),
                _buildInfo(user.name.isNotEmpty ? user.name : "Nome não disponível"),
                const SizedBox(height: 10),
                _buildLabel('Email:'),
                _buildInfo(user.email.isNotEmpty ? user.email : "Email não disponível"),
                const SizedBox(height: 10),
                _buildLabel('CPF:'),
                _buildInfo(user.cpf.isNotEmpty ? user.cpf : "CPF não disponível"),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () {
                    // Redireciona para a página de atualização de perfil
                    // Get.to(() => const UpdateProfileScreen());
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF8BF337),
                    shape: const StadiumBorder(),
                    padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                  ),
                  child: const Text('Editar Perfil', style: TextStyle(color: Colors.white)),
                ),
                const SizedBox(height: 20),
                Divider(color: Colors.grey),
                const SizedBox(height: 10),
                ProfileMenuWidget(
                  title: "Sair",
                  icon: LineAwesomeIcons.sign_out_alt_solid,
                  textColor: Colors.red,
                  endIcon: false,
                  onPress: () {
                    // Exibe diálogo de confirmação antes de sair
                    _showLogoutDialog(context, logOut);
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
  Widget _buildLabel(String text) {
    return Text(
      text,
      style: const TextStyle(
        fontSize: 20, // Ajuste o tamanho da fonte conforme necessário
        color: Color(0xFF8BF337), // Cor do texto
        fontWeight: FontWeight.bold, // Negrito
      ),
    );
  }

  Widget _buildInfo(String text) {
    return Text(
      text,
      style: const TextStyle(
        fontSize: 18, // Ajuste o tamanho da fonte conforme necessário
        color: Color(0xFFDCDCDC), // Cor do texto
      ),
    );
  }
}
void _showLogoutDialog(BuildContext context, Future<void> Function() logOut) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Logout"),
          content: const Text("Você tem certeza que deseja sair?"),
          actions: <Widget>[
            TextButton(
              onPressed: () {

                Navigator.of(context).pop(); 
              },
              child: const Text("Cancelar"),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop(); 
                logOut();
              },
              style: ElevatedButton.styleFrom(backgroundColor: Colors.redAccent),
              child: const Text("Sim"),
            ),
          ],
        );
      },
    );
  }
