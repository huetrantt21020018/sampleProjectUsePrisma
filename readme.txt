YÊU CẦU

1. Kết nối với CSDL MySQL Classicmodels sử dụng Primsa

https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-mysql

(chú ý: chọn MySQL thay vì PostgreSQL từ dropdown đổ xuống, để có hướng dẫn cho MySQL)

2. Truy vấn trả về các Khách hàng (customer) kèm theo các orders của khách hàng.

3. Kết với Express, viết Rest API trả về khách hàng và các order của khách hàng.

(Tham khảo: https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express) 

===================================================

Đây là đoạn mã JavaScript sử dụng framework Express và ORM Prisma để xây dựng một ứng dụng web truy vấn cơ sở dữ liệu.

Đoạn mã import hai module là express và PrismaClient từ hai package khác nhau. express là một framework web cho phép xây dựng các ứng dụng web với Node.js. PrismaClient là một ORM (Object Relational Mapping) cho phép truy vấn cơ sở dữ liệu bằng cách sử dụng các model được định nghĩa trước.

Đoạn mã khởi tạo một đối tượng PrismaClient để kết nối đến cơ sở dữ liệu và khởi tạo một đối tượng express để xây dựng các tuyến đường (route) cho ứng dụng web.

===================================================

app.get('/customers', async (req, res))

Đoạn mã này định nghĩa một tuyến đường (route) GET cho phép truy vấn tất cả khách hàng trong cơ sở dữ liệu. Khi người dùng truy cập vào tuyến đường /customers, hàm xử lý được gọi.

Trong hàm xử lý, đầu tiên ta sử dụng đối tượng prisma để truy vấn tất cả khách hàng bằng cách gọi phương thức findMany() trên model customers. Kết quả truy vấn được lưu vào biến customers.

Sau đó, ta trả về một chuỗi HTML chứa thông tin của tất cả khách hàng ở dạng bảng. Đối tượng customers được thực hiện phép ánh xạ để tạo ra một chuỗi HTML chứa thông tin của mỗi khách hàng. Chuỗi HTML này được gửi về client bằng phương thức res.send().

===================================================

app.get('/customers/:customerId/orders', async (req, res))

Đoạn mã này cũng định nghĩa một tuyến đường GET cho phép truy vấn tất cả đơn hàng của một khách hàng cụ thể. Tuyến đường này có một tham số động là customerId để chỉ định khách hàng cần truy vấn. Khi người dùng truy cập vào tuyến đường /customers/:customerId/orders, hàm xử lý được gọi.

Trong hàm xử lý, ta lấy customerId từ tham số động bằng cách sử dụng req.params.customerId và chuyển đổi giá trị sang kiểu số nguyên bằng parseInt(). Nếu customerId không phải là một số nguyên, ta trả về lỗi 400 (Bad Request) cho client.

Sau đó, ta sử dụng đối tượng prisma để truy vấn thông tin của khách hàng và đơn hàng tương ứng. Ta sử dụng phương thức findUnique() trên model customers để tìm khách hàng có customerNumber bằng customerId. Ta cũng sử dụng thuộc tính include để lấy thông tin đơn hàng của khách hàng đó.

Nếu khách hàng được tìm thấy, ta trả về một chuỗi HTML chứa thông tin của tất cả đơn hàng của khách hàng đó. Đối tượng customer được sử dụng để tạo ra chuỗi HTML tương tự như trong tuyến đường /customers.

Nếu khách hàng không tồn tại, ta trả về lỗi 404 (Not Found) cho client.