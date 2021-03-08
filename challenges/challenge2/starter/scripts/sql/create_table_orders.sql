CREATE TABLE dbo.Orders (
	Id UNIQUEIDENTIFIER
        CONSTRAINT Guid_Default DEFAULT
        NEWSEQUENTIALID() ROWGUIDCOL,
	[User] nvarchar(255) not null,
	[Date] datetime not null DEFAULT (GETDATE()),
	[IcecreamId] int not null REFERENCES Icecreams(Id),
	[Status] nvarchar(100) not null DEFAULT 'New',
	[DriverId] int null REFERENCES Drivers(Id),
	[FullAddress] nvarchar(2000),
	[LastPosition] nvarchar(500)
	
	CONSTRAINT Guid_PK PRIMARY KEY (Id)
)
