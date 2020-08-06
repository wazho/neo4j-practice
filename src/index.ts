import * as neo4j from 'neo4j-driver';

const host = 'bolt://localhost:7687';
const driver = neo4j.driver(host);

export const addUser = async (name: string, age?: number): Promise<unknown> => {
  let user;
  const session = driver.session();

  try {
    const result = await session.run(
      `CREATE (n: User { name: $name, age: $age })
      RETURN n`,
      { name, age }
    );

    const [singleRecord] = result.records;
    const node = singleRecord.get(0);

    user = node.properties;
  } finally {
    await session.close();
  }

  return user;
};

export const getUser = async (name: string): Promise<unknown> => {
  let user;
  const session = driver.session();

  try {
    const result = await session.run(
      `MATCH (n: User { name: $name })
      RETURN n`,
      { name }
    );

    const [singleRecord] = result.records;
    const node = singleRecord.get(0);

    user = node.properties;
  } finally {
    await session.close();
  }

  return user;
};

export const removeUser = async (name: string): Promise<unknown> => {
  let summary;
  const session = driver.session();

  try {
    const result = await session.run(
      `MATCH (n: User { name: $name })
      DELETE n
      RETURN n`,
      { name }
    );

    const { nodesDeleted } = result.summary.counters.updates();
    summary = nodesDeleted;
  } finally {
    await session.close();
  }

  return summary;
};

export const close = async (): Promise<void> => {
  await driver.close();
};
