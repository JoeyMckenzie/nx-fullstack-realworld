;USE [master]
GO

;DROP DATABASE [Realworld]
GO

;IF NOT EXISTS(
	SELECT 1 FROM [sys].[databases] WHERE [name] = 'Realworld'
)
BEGIN
	CREATE DATABASE [Realworld]
END
GO

;USE [Realworld]
GO
