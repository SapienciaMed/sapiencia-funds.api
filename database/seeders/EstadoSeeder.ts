import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import State from 'App/Models/State'

export default class extends BaseSeeder {
  public async run () {
    await State.createMany([
      { name: 'Pendiente aprobación' },
      { name: 'Aprobado' },
      { name: 'Aprobado - Modificado' }
    ])  
  }
}
