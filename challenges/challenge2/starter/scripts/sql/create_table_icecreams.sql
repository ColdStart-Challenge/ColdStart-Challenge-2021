CREATE TABLE dbo.Icecreams (
	[Id] int primary key clustered,
	[Name] nvarchar(255) not null,
	[Description] nvarchar(2000) not null,
	[ImageUrl] nvarchar(2000) not null
)
