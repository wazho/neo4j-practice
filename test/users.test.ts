import { addUser, getUser, removeUser, close } from '../src';

describe('Users', () => {
  // Create
  it('Add User', async done => {
    const expected = { name: 'TestUser', age: 28 };
    const actual = await addUser('TestUser', 28);

    expect(actual).toEqual(expected);

    done();
  });

  // Read
  it('Get User', async done => {
    const expected = await addUser('TestUser', 28);
    const actual = await getUser('TestUser');

    expect(actual).toEqual(expected);

    done();
  });

  // Delete
  it('Remove User', async done => {
    await addUser('TestUser', 28);
    const actual = await removeUser('TestUser');

    expect(actual).toEqual(1);

    done();
  });

  afterAll(async () => {
    await close();
  });

  afterEach(async () => {
    await removeUser('TestUser');
  });
});
