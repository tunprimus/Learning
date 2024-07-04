def main():
    num = int(input("What is num? "))
    for s in sheep(num):
        print(s)

def sheep(n):
    for i in range(n):
        yield "🐑" * i

if __name__ == "__main__":
    main()
