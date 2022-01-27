SET IDENTITY_INSERT [State] ON
INSERT INTO [State]
    ([Id], [Name])
VALUES
    (1, 'Alabama'),
    (2, 'Alaska'),
    (3, 'Arizona'),
    (4, 'Arkansas'),
    (5, 'California'),
    (6, 'Colorado'),
    (7, 'Connecticut'),
    (8, 'Delaware'),
    (9, 'Florida'),
    (10, 'Georgia'),
    (11, 'Hawaii'),
    (12, 'Idaho'),
    (13, 'Illinois'),
    (14, 'Indiana'),
    (15, 'Iowa'),
    (16, 'Kansas'),
    (17, 'Kentucky'),
    (18, 'Louisiana'),
    (19, 'Maine'),
    (20, 'Maryland'),
    (21, 'Massachusetts'),
    (22, 'Michigan'),
    (23, 'Minnesota'),
    (24, 'Mississippi'),
    (25, 'Missouri'),
    (26, 'Montana'),
    (27, 'Nebraska'),
    (28, 'Nevada'),
    (29, 'New Hampshire'),
    (30, 'New Jersey'),
    (31, 'New Mexico'),
    (32, 'New York'),
    (33, 'North Carolina'),
    (34, 'North Dakota'),
    (35, 'Ohio'),
    (36, 'Oklahoma'),
    (37, 'Oregon'),
    (38, 'Pennsylvania'),
    (39, 'Rhode Island'),
    (40, 'South Carolina'),
    (41, 'South Dakota'),
    (42, 'Tennessee'),
    (43, 'Texas'),
    (44, 'Utah'),
    (45, 'Vermont'),
    (46, 'Virginia'),
    (47, 'Washington'),
    (48, 'West Virginia'),
    (49, 'Wisconsin'),
    (50, 'Wyoming');
     
SET IDENTITY_INSERT [State] OFF


SET IDENTITY_INSERT [User] ON
INSERT INTO [User]
    ([Id], [Name], [Email], [ImageUrl], [FirebaseUserId])
VALUES
    (1, 'Joshua', 'joshua@shifteight.com', 'https://res.cloudinary.com/dcxvvavft/image/upload/v1643219688/84157420_cyxrp2.jpg', 'eInrNezSq3gx1x3BaD3ubAZ5MD13'),
    (2, 'Lacey', 'lacey@cottagecore.com', 'https://res.cloudinary.com/dcxvvavft/image/upload/v1643219689/Lacey_sy26ko.jpg', '3m4Viw1o6JdHNC7yfqj3HkOFy5o2'),
    (3, 'Colby', 'colby@smoothieking.com', 'https://res.cloudinary.com/dcxvvavft/image/upload/v1643219689/colby_cebgdq.png', 'DC1cXjswLSMmXTUKgR0XjQ61wOd2'),
    (4, 'Brady', 'brady@guccislides.com', 'https://res.cloudinary.com/dcxvvavft/image/upload/v1643219688/brady_ec3jfd.jpg', 'P26jofVRE7Wr4LynuUaXOiQD1042'),
    (5, 'Katie', 'katie@whatevah.com', 'https://res.cloudinary.com/dcxvvavft/image/upload/v1643219688/katie_vloupc.jpg', 'f3kGtKZAC7W78c6JixbCEe984gQ2');
SET IDENTITY_INSERT [User] OFF

SET IDENTITY_INSERT [Cryptid] ON
INSERT INTO [Cryptid]
	([Id], [Name], [Description], [ImageUrl], [DateCreated], [UserId], [StateId])
VALUES
	(1, 'Bigfoot', 'This creature was wandering near my campsite and it looked just like Bigfoot! It was about 7 foot tall and had a terrible smell, I could smell it from about 150 ft away!', 'https://res.cloudinary.com/dcxvvavft/image/upload/v1643218855/bigfoot-12_fmeyzb.jpg', SYSDATETIME(), 1, 42),
    (2, 'Moth Man', 'I went out to the old TNT factory outside Point Pleasant last night and was able to spot the Moth Man! I kept my distance though!', 'https://res.cloudinary.com/dcxvvavft/image/upload/v1643225896/Hhlhga_gGBjPOAy4agC9fjHC28Wo48le59bnFyBRlQ8_r8ctuv.png', SYSDATETIME(), 3, 48),
    (3, 'Pope Lick Monster', 'When I was little my mom and I saw this creature wandering outside our cabin on Pope Lick creek, it looked like a mix between a man and a goat!!', 'https://res.cloudinary.com/dcxvvavft/image/upload/v1643226032/pope-lick-monster-goatman-1_ahthg5.jpg', SYSDATETIME(), 2, 17);
SET IDENTITY_INSERT [Cryptid] OFF

SET IDENTITY_INSERT [Comment] ON
INSERT INTO [Comment]
    ([Id], [Message], [UserId], [CryptidId])
VALUES
    (1, 'I think I saw this same thing when I was camping last weekend!', 1, 1),
    (2, 'What even is this thing?!', 3, 3),
    (3, 'This is terrifying!', 2, 2),
    (4, 'I can feel the bad vibes coming off this thing', 4, 1);
SET IDENTITY_INSERT [Comment] OFF

SET IDENTITY_INSERT [Classification] ON
INSERT INTO [Classification]
	([Id], [Name])
VALUES
	(1, 'Humanoid'),
    (2, 'Animal Human Hybrid'),
    (3, 'Flying'),
    (4, 'Aquatic'),
    (5, 'Abominable Swamp Slob'),
    (6, 'Non-Corporeal'),
    (7, 'Ape-Like'),
    (8, 'Chimera'),
    (9, 'Canine'),
    (10, 'Demon');
SET IDENTITY_INSERT [Classification] OFF


SET IDENTITY_INSERT [CryptidClassification] ON
INSERT INTO [CryptidClassification]
	([Id], [CryptidId], [ClassificationId])
VALUES
	(1, 1, 1),
    (2, 1, 7),
    (3, 2, 3),
    (4, 3, 2),
    (5, 3, 1);
SET IDENTITY_INSERT [CryptidClassification] OFF

SET IDENTITY_INSERT [Track] ON
INSERT INTO [Track]
	([Id], [UserId], [CryptidId])
VALUES
	(1, 1, 2),
    (2, 2, 2),
    (3, 1, 3),
    (4, 5, 2),
    (5, 3, 3),
    (6, 4, 2);
SET IDENTITY_INSERT [Track] OFF

