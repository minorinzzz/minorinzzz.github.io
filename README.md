<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Miniproyecto2</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
    <link rel="stylesheet" href="css/estilo.css">
</head>

<body class="h-100 login">
    <script src="js/servidor.js" type="text/javascript" language="javascript"></script>
    <div class="container h-100 ">
        <div class="row h-100 align-items-center justify-content-center">
            <div class="col-md-7">
                <div class="contenido p-5 bg-light">
                    <h2 class="text-center bg-primary text-light py-2 text-uppercase">Login Administradores</h2>
                    <form name="formu">
                        <div class="form-group">
                            <label for="email">User</label>
                            <input type="email" class="form-control" for="user" id="user" placeholder="Enter user">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" for="pass" id="pass" placeholder="Password">
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Recordar</label>
                        </div>
                        <input type="button" class="mt-4 btn btn-primary" value="Iniciar Sesión" onclick="ingresar();">
                    </form>
                </div>
            </div>
        </div>

    </div>
    <div class="container"></div>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
</body>

</html>
