-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DF__User__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [name] NVARCHAR(1000),
    [email] NVARCHAR(1000) NOT NULL,
    [hashedPassword] NVARCHAR(1000),
    [bio] NVARCHAR(1000) NOT NULL CONSTRAINT [DF__User__bio] DEFAULT '',
    CONSTRAINT [PK__User__id] PRIMARY KEY ([id]),
    CONSTRAINT [User_email_unique] UNIQUE ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Article] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DF__Article__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [intro] NVARCHAR(1000) NOT NULL,
    [content] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000),
    CONSTRAINT [PK__Article__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Comment] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DF__Comment__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [content] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000),
    [articleId] NVARCHAR(1000),
    CONSTRAINT [PK__Comment__id] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Tag] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DF__Tag__createdAt] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [PK__Tag__id] PRIMARY KEY ([id]),
    CONSTRAINT [Tag_name_unique] UNIQUE ([name])
);

-- CreateTable
CREATE TABLE [dbo].[_UserFollows] (
    [A] NVARCHAR(1000) NOT NULL,
    [B] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [_UserFollows_AB_unique] UNIQUE ([A],[B])
);

-- CreateTable
CREATE TABLE [dbo].[_Favorites] (
    [A] NVARCHAR(1000) NOT NULL,
    [B] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [_Favorites_AB_unique] UNIQUE ([A],[B])
);

-- CreateTable
CREATE TABLE [dbo].[_ArticleToTag] (
    [A] NVARCHAR(1000) NOT NULL,
    [B] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [_ArticleToTag_AB_unique] UNIQUE ([A],[B])
);

-- CreateIndex
CREATE INDEX [_UserFollows_B_index] ON [dbo].[_UserFollows]([B]);

-- CreateIndex
CREATE INDEX [_Favorites_B_index] ON [dbo].[_Favorites]([B]);

-- CreateIndex
CREATE INDEX [_ArticleToTag_B_index] ON [dbo].[_ArticleToTag]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[Article] ADD CONSTRAINT [FK__Article__userId] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [FK__Comment__userId] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Comment] ADD CONSTRAINT [FK__Comment__articleId] FOREIGN KEY ([articleId]) REFERENCES [dbo].[Article]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[_UserFollows] ADD CONSTRAINT [FK___UserFollows__A] FOREIGN KEY ([A]) REFERENCES [dbo].[User]([id])  ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[_UserFollows] ADD CONSTRAINT [FK___UserFollows__B] FOREIGN KEY ([B]) REFERENCES [dbo].[User]([id])  ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[_Favorites] ADD CONSTRAINT [FK___Favorites__A] FOREIGN KEY ([A]) REFERENCES [dbo].[Article]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[_Favorites] ADD CONSTRAINT [FK___Favorites__B] FOREIGN KEY ([B]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[_ArticleToTag] ADD CONSTRAINT [FK___ArticleToTag__A] FOREIGN KEY ([A]) REFERENCES [dbo].[Article]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[_ArticleToTag] ADD CONSTRAINT [FK___ArticleToTag__B] FOREIGN KEY ([B]) REFERENCES [dbo].[Tag]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;
