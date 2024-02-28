from typing import Literal

UserType = Literal["admin", "other", "student"]
Serie = Literal["9º EF", "1º EM", "2º EM", "3º EM"]
AttachType = Literal["File", "Link"]
AchievementType = Literal["olympic medal", "certificate"]
AchievementStatus = Literal["ready", "pending", "soft delete"]
MedalType = Literal["participation", "bronze", "silver", "gold"]
PostType = Literal["Notice", "ClassMaterial", "Activity", "Other"]
FrequencyStatus = Literal["Present", "Missed", "Justified"]
CommentType = Literal["Public", "Private"]
ExpenseLogType = Literal["Deposit", "Removal"]
AccountType = Literal["Conta Corrente", "Conta Poupança"]
