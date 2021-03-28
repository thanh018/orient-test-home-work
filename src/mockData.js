// Random
const randomString = () => Math.random().toString(20).substring(8);

// Randomized 1.000.000 records
export const mockData = new Array(1000000).fill(true).map((val, id) => ({
  id: id + 1,
  fullname: randomString(),
  ssn: randomString(),
  position: randomString(),
  salary:  Math.ceil(Math.random() * 8)*10000000,
  address: randomString(),
  phone: `+1${Math.ceil(Math.random()*10000000)}`,
  country: randomString(),
  department: randomString(),
  age: Math.ceil(Math.random() * 80)
}));
