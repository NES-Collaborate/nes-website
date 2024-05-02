from typing import Literal

UserType = Literal["admin", "other", "student"]
Serie = Literal["9º EF", "1º EM", "2º EM", "3º EM"]
Role = Literal["admin", "teacher", "student", "monitor"]
AttachType = Literal["file", "link"]
AchievementType = Literal["olympic medal", "certificate"]
AchievementStatus = Literal["ready", "pending", "soft delete"]
MedalType = Literal["participation", "bronze", "silver", "gold"]
PostType = Literal["notice", "class material", "activity", "other"]
FrequencyStatus = Literal["present", "missed", "justified"]
CommentType = Literal["public", "private"]
ExpenseLogType = Literal["deposit", "removal"]
AccountType = Literal["conta corrente", "conta poupança"]
