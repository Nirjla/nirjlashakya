#  New-Item-ItemType File -Path "storeInfo.txt" -- creates a text file in the current directory

class InvalidError(Exception):
    pass
class Bank:
    def __init__(self):
        self.password = ""
        self.mobile= ""
        self.askAmount=0
        # self.phoneNumber()
        self.has_uppercase = False
        self.has_lowercase = False
        self.has_special = False
        self.has_number =  False
        self.option()
        self.mobileNum()
        self.storePassword()
        self.menu()
        self.storeDeposit()
        self.storeInfo()
        self.welcome()
        self.viewHistory()

    def option(self):
       try:
        user_input = int(input(
            "Welcome to Discord Banking Ltd \n 1. Create a new account \n 2.Already have an account \n Enter your option:"))
       
        if user_input == 1:
            self.mobileNum()
            self.storePassword()
            self.menu()

            
        elif user_input ==2:
            self.welcome()
            self.menu()

        else:
           raise InvalidError("Wrong Option Alert!!")
       except InvalidError as e :
             print(f"Error:{str(e)}")
             self.option()
    def storePassword(self):
        # @staticmethod
        # def StrongPassword():
        #     print("Your passoword must include special characters, lowercase charcters , uppercase characters and numbers.")
       self.password = input("Enter your password:")
       checkLength = len(self.password)
       if checkLength < 8:
           print("Your password must be more than eight characters")
           self.storePassword()
           
       else:
            for char in self.password:
                if char.isupper():
                    self.has_uppercase = True
                if char.islower():
                    self.has_lowercase =True
                if char.isdigit():
                    self.has_number =True
                else:
                    self.has_special =True
            if not (self.has_uppercase and self.has_lowercase and self.has_number and self.has_special):
                 raise InvalidError("Your password must include at least one uppercase letter, one lowercase letter, one special character, and one number.")
            
            else:
                print("Strong Password!")
    


    def menu(self):
        user_input = int(input(
            "Banking services:\n 1.Cash Deposit \n 2.Withdraw \n 3.Transaction History \n 4.Total balance\n"))
        if user_input == 1:
           self.storeDeposit()
        elif user_input== 2:
            pass
        elif user_input== 3:
            self.viewHistory()
        #     pass
        #                 # print(f"Deposited Amount:{askAmount}\n Source of fund: {askFor}")
        # elif askFor ==2:
        #     pass

    def storeDeposit(self):
      try:
        self.askFor = int(input("1.Deposit to self \n 2.Deposit to other\n"))
        if self.askFor ==1:
                self.askAmount = int(input("Deposit Amount: \n "))
                self.askSource = int(input("Source of Fund: \n1:Salary Income \n2.Business Income \n 3.Borrowing\n"))
                if self.askSource== 1 or self.askSource== 2 or self.askSource== 3:
                   self.storeInfo()
      except InvalidError as e:
          raise "Error:{str(e)}"
      else:
          print(f"{self.askAmount} has been successfully deposited.")
          self.menu()
          
    
    def mobileNum(self):
        self.mobile = input("Enter your mobile number")
        mobile_number=self.mobile
        if  not mobile_number.isdigit():
                raise InvalidError("You should be usings digits")
                 
        checkLength = len(self.mobile)
        if checkLength > 10 or checkLength < 10:
                print("You have entered wrong number.Please try again")
                self.mobileNum()
        
    def storeInfo(self):
        with open ("Banking_software\storeInfo.txt" , "a") as f:
            f.write(f"Mobile number:{self.mobile}\nPassword:{self.password}\nDeposited Amount:{self.askAmount}\n Source of fund: {self.askFor}\n")     
    def viewHistory(self):
        self.mobileNum()
        self.storePassword() 
        with open("Banking_software\storeInfo.txt","r") as f:
            found = True
            for line in f:
                if self.mobile and self.password in line:
                   try:
                    print(line.strip())
                    print(next(f).strip())
                    print(next(f).strip())
                    print(next(f).strip())
                   except StopIteration:
                    print("Incomplete transaction information found for this mobile number.")
                   found=True
                   break
            if not found:
                print("No transaction history found!!")
    def welcome(self):
        print("Welcome to Discord Banking Ltd")
        self.menu()
o1 = Bank()
o1.option()