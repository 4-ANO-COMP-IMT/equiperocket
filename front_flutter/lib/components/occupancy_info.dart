

import 'package:flutter/material.dart';

class OccupancyInfo extends StatelessWidget {
  final List<Map<String, dynamic>> occupancyData;
  final bool loading;

  const OccupancyInfo({
    super.key,
    required this.occupancyData,
    required this.loading,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 40),
      alignment: Alignment.center,
      child: loading
          ? const Text('Carregando dados de ocupação...')
          : Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: occupancyData.map((restaurant) {
                return OccupancyItem(
                  name: restaurant['name'],
                  category: restaurant['category'],
                  address: restaurant['address'],
                  currentOccupancy: restaurant['currentOccupancy'],
                  maxOccupancy: restaurant['maxOccupancy'],
                );
              }).toList(),
            ),
    );
  }
}

class OccupancyItem extends StatelessWidget {
  final String name;
  final String category;
  final String address;
  final int currentOccupancy;
  final int maxOccupancy;

  const OccupancyItem({
    super.key,
    required this.name,
    required this.category,
    required this.address,
    required this.currentOccupancy,
    required this.maxOccupancy,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(15),
      margin: const EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: Colors.grey.shade300),
        borderRadius: BorderRadius.circular(8),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            offset: const Offset(0, 2),
            blurRadius: 4,
          ),
        ],
      ),
      width: double.infinity,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            name,
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 10),
          Text('Categoria: $category'),
          Text('Endereço: $address'),
          Text('Ocupação: $currentOccupancy / $maxOccupancy pessoas'),
        ],
      ),
    );
  }
}
