import 'package:geolocator/geolocator.dart';

class LocationService {
  Future<Map<String, dynamic>> getLocation() async {
   bool serviceEnabled;
    LocationPermission permission;
    try{
      serviceEnabled = await Geolocator.isLocationServiceEnabled();
      permission = await Geolocator.checkPermission();
      if (!serviceEnabled) {
        return Future.error('O serviço de localização está desativado.');
      }
      if(!serviceEnabled){
        return Future.error('O serviço de localização está desativado.');
      }
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          return Future.error('Permissão de localização negada.');
        }
      }
      if (permission == LocationPermission.deniedForever) {
        return Future.error('Permissão de localização negada permanentemente.');
      }
      Position? position = await Geolocator.getCurrentPosition(
        timeLimit: const Duration(seconds: 10),
      );
      return  {
        'latitude': position.latitude,
        'longitude': position.longitude,
      };
    }catch(e){
      print(e);
      return Future.error('Erro ao obter a localização');
      
    }
  }
}