<form action="{{route("procesar")}}" method="post">
    @csrf
    Nombre:<input type="text" name="nombre">
    Especie:<input type="text" name="especie">
    Raza:<input type="text" name="raza">
    <input type="submit" value="enviar">
</form>

@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
