insert into user (id, active, email, email_verified, firstname, lastname, password, photo_url, provider)
  values (4, 1, 'pie@pie.com', 0, 'Pierre', 'Omidyar', '$2a$10$Em2iCtF3TxsVsRuzQEgcMu/MCnXtrFRVqIaxKOxn3Q2kCWS0fJHPO',
  'https://s3.amazonaws.com/intershop-is3/no-avatar.jpg', 'local');
insert into user_role (user_id, roles) values (4, 'SELLER');

insert into shop (id, description, name_shop, photo_url, url, user_id)
  values (1, 'American multinational e-commerce corporation', 'eBay', 'https://s3.amazonaws.com/intershop-is3/ebay.jpg', 'https://www.ebay.com/', 4);