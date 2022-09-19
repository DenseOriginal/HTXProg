import random
import time

def compare(first, second):
  return first > second

def bubbleSort(list):
  n = len(list)
  swapped = False
  for i in range(n-1):
    for j in range(0, n-i-1):

      if compare(list[j], list[j + 1]):
        swapped = True
        list[j], list[j + 1] = list[j + 1], list[j]
      
    if not swapped:
      return

def timeExec(n):
  randomList = [random.randint(0,100) for _ in range(n)];
  t0 = time.time()
  bubbleSort(randomList)
  t1 = time.time()

  return (t1-t0) * 100

print(f'N = 100    {timeExec(100)}ms');
print(f'N = 1000    {timeExec(1000)}ms');
print(f'N = 10000    {timeExec(10000)}ms');