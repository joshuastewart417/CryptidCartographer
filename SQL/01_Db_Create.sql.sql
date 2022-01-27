CREATE TABLE [Cryptid] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [ImageUrl] nvarchar(255),
  [DateCreated] datetime NOT NULL,
  [UserId] int NOT NULL,
  [StateId] int NOT NULL
)
GO

CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [ImageUrl] nvarchar(255),
  [FirebaseUserId] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [State] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Comment] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Message] nvarchar(255) NOT NULL,
  [UserId] int NOT NULL,
  [CryptidId] int NOT NULL
)
GO

CREATE TABLE [Track] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [CryptidId] int NOT NULL
)
GO

CREATE TABLE [Classification] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [CryptidClassification] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [CryptidId] int NOT NULL,
  [ClassificationId] int NOT NULL
)
GO

ALTER TABLE [Track] ADD FOREIGN KEY ([CryptidId]) REFERENCES [Cryptid] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([CryptidId]) REFERENCES [Cryptid] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [CryptidClassification] ADD FOREIGN KEY ([CryptidId]) REFERENCES [Cryptid] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [CryptidClassification] ADD FOREIGN KEY ([ClassificationId]) REFERENCES [Classification] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Cryptid] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Track] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Cryptid] ADD FOREIGN KEY ([StateId]) REFERENCES [State] ([Id])
GO
