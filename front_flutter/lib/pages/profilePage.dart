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
  List<dynamic> userProfile = [];
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

      if (userData != null && userData['data'] != null) {
        setState(() {
          userProfile = userData['data'];
          isLoading = false;
        });
      } else {
        setState(() {
          isLoading = false;
        });

        // Redireciona para a página de login, removendo todas as rotas anteriores
        if (mounted) {
          Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (context) => LoginPage()),
            (Route<dynamic> route) => false, // Remove todas as rotas anteriores
          );
        }

        throw Exception('Erro ao buscar dados do usuário');
      }
    } catch (e) {
      print("Erro ao buscar dados do usuário: $e");
    }
  }


  @override
  Widget build(BuildContext context) {
    final user = User(
      name: userProfile.isNotEmpty ? userProfile[0]['name'] : '',
      email: userProfile.isNotEmpty ? userProfile[0]['email'] : '',
      cpf: userProfile.isNotEmpty ? userProfile[0]['cpf'] : '',
    );

    return Scaffold(
      appBar: AppBar(
         title: Text('Perfil do Usuário', style: Theme.of(context).textTheme.headlineMedium),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            Stack(
              children: [
                SizedBox(
                  height: 100,
                  width: 100,
                  child: CircleAvatar(
                    backgroundColor: Colors.grey,
                    child: Icon(
                      Icons.person,
                      color: Colors.white,
                      size: 50,
                    ),
                  ),
                ),
                Positioned(
                  bottom: 0,
                  right: 0,
                  child: Container(
                    height: 30,
                    width: 30,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(100),
                      color: Colors.blue, // Replace with your desired color
                    ),
                    child: Icon(
                      Icons.edit,
                      color: Colors.white,
                      size: 20,
                    ),
                  ),
                )
              ],
            ),
            const SizedBox(height: 10),
            Text(user.name, style: Theme.of(context).textTheme.headlineMedium),
            Text(user.email, style: Theme.of(context).textTheme.bodyMedium),
            Text(user.cpf, style: Theme.of(context).textTheme.bodyMedium), 
            const SizedBox(height: 20),
            SizedBox(
              width: 200,
              child: ElevatedButton(
                onPressed: () {
                  // Redireciona para a página de atualização de perfil
                  // Get.to(() => const UpdateProfileScreen());
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue, // Replace with your desired color
                  shape: const StadiumBorder(),
                ),
                child: const Text('Editar Perfil', style: TextStyle(color: Colors.white)),
              ),
            ),
            const SizedBox(height: 30),
            const Divider(),
            const SizedBox(height: 10),

            
            ProfileMenuWidget(
              title: "Configurações",
              icon: LineAwesomeIcons.cog_solid,
              onPress: () {
               
              },
            ),
            ProfileMenuWidget(
              title: "Gerenciamento de Usuários",
              icon: LineAwesomeIcons.user_check_solid,
              onPress: () {
            
              },
            ),
            const Divider(),
            const SizedBox(height: 10),
            ProfileMenuWidget(
              title: "Informações",
              icon: LineAwesomeIcons.info_solid,
              onPress: () {
             
              },
            ),
            ProfileMenuWidget(
              title: "Sair",
              icon: LineAwesomeIcons.sign_out_alt_solid,
              textColor: Colors.red,
              endIcon: false,
              onPress: () {
                // Exibe diálogo de confirmação antes de sair
                _showLogoutDialog(context);
              },
            ),
          ],
        ),
      ),
    );
  }
}

void _showLogoutDialog(BuildContext context) {
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
                // Lógica para logout
                Navigator.of(context).pop();
                // Navega para a tela de login após o logout
                // Get.offAllNamed("/login");
              },
              style: ElevatedButton.styleFrom(backgroundColor: Colors.redAccent),
              child: const Text("Sim"),
            ),
          ],
        );
      },
    );
  }
