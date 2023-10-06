import  test  from 'japa'
import MasterRepository from 'App/Repositories/MasterRepository'
import { IMaster } from 'App/Interfaces/MasterInterface'


test.group('Master Repository', () => {
  test('should create a new master', async (assert) => {
    const masterRepo = new MasterRepository()
    const master: IMaster = { codtlmo: 4,name: "test", description: "prueba"}
    const createdMaster = await masterRepo.createMaster(master)
    assert.isTrue(!!createdMaster.id) 
  })

  test('should paginate masters', async (assert) => {
    const masterRepo = new MasterRepository()
    const filters = {codtlmo: 1, page: 1, perPage: 10 }
    const paginatedMasters = await masterRepo.getMasterPaginate(filters)
    assert.isArray(paginatedMasters.array)
  })
})


