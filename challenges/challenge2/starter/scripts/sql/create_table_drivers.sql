CREATE TABLE dbo.Drivers (
	[Id] int primary key clustered,
	[Name] nvarchar(255) not null,
	[ImageUrl] nvarchar(2000) DEFAULT 'https://coldstartsa.blob.core.windows.net/web/assets/Driver1.png'
)
