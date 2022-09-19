import random
randomList = [random.randint(0,100) for _ in range(1000)];
print(len(randomList))

for idx in range(10):
  n = int(input(f'New number ({idx}):'))
  randomList.append(n)

print(len(randomList))

predicate = range(50, 60)
filteredNumbers = [n for n in randomList if n in predicate]
print(filteredNumbers)
print(f'Length: {len(filteredNumbers)}')