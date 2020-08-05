import { addUser, getUser, removeUser, close } from '../src';

describe('Users', () => {
  // Create
  it('Add User', async done => {
    const expected = { name: 'Salmon', age: 28 };
    const actual = await addUser('Salmon', 28);

    expect(actual).toEqual(expected);

    done();
  });

  // Read
  it('Get User', async done => {
    const expected = await addUser('Salmon', 28);
    const actual = await getUser('Salmon');

    expect(actual).toEqual(expected);

    done();
  });

  // Delete
  it('Remove User', async done => {
    await addUser('Salmon', 28);
    const actual = await removeUser('Salmon');

    expect(actual).toEqual(1);

    done();
  });

  afterAll(async () => {
    await close();
  });

  afterEach(async () => {
    await removeUser('Salmon');
  });
});
