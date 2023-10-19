import test from 'japa'
import TypeMasterListRepository from 'App/Repositories/TypeMasterListRepository'


test.group('TypeMasterList Repository', (group) => {

  group.beforeEach(async () => {
    // Cualquier configuración que necesites hacer antes de cada prueba
  })

  test('should retrieve a list of type masters', async (assert) => {
    const repo = new TypeMasterListRepository()
    const typeMasterList = await repo.getTypeMasterList()

    assert.isArray(typeMasterList)    
  })
})
