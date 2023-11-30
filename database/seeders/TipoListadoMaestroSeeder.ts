import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TypeMasterList from 'App/Models/TypeMasterList'

export default class extends BaseSeeder {
  public async run () {
    await TypeMasterList.createMany([
      { name: 'Programa' },
      { name: 'Fondo' },
      { name: 'Línea' },
      { name: 'Concepto' },
      { name: 'Fondo comuna' },
      { name: 'id fondo' }
    ])
  }
}
