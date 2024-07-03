
def main():
    balance = 0
    print("Balance:", balance)
    deposit(100)
    withdraw(50)
    print("Balance:", balance)

def deposit(num):
    balance += num

def withdraw(num):
    balance -= num

if __name__ == "__main__":
    main()