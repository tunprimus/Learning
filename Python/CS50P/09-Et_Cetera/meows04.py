def meow(num: int) -> str:
    return "meow\n" * num

number: int = int(input("Number: "))
meows: str = meow(number)
print(meows, end="")