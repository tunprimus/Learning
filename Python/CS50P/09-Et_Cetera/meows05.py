
def meow(num: int) -> str:
    """
    Meow num times.

    :param num: Number of times to meow
    :type num: int
    :raise TypeError: If num is not an int
    :return: A string of num meows, one per line
    :rtype: str
    """
    return "meow\n" * num

number: int = int(input("Number: "))
meows: str = meow(number)
print(meows, end="")