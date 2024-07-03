def meow(num: int):
    for _ in range(num):
        print("meow")

number: int = int(input("Number: "))
meows: str = meow(number)
print(meows)