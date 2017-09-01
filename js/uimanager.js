// HTML UI COMS

function btnAddTransport()
{
    var inputValue = document.getElementById("inputTransportId").value;
    if(inputValue != null || inputValue === "" )
    {
        getLinjeData(inputValue);
        print("Henter stoppdata for rute " + inputValue);
        //document.getElementById("btnAddTransport").disabled = true;
    }
}

function updateInfo()
{
    if(selectedMarkerRoute != null && selectedMarkerTransport != null)
    {
        var tran = ROUTE_MANAGER[selectedMarkerRoute].getTransport()[selectedMarkerTransport];

        if(tran != null)
        {
            document.getElementById("infoTitle").innerHTML = "Tittel: " + tran.getTitle();
            document.getElementById("infoId").innerHTML = "Id: " + tran.getId();
            document.getElementById("infoPosition").innerHTML = "Posisjon: " + tran.getPosition().lat + ",\n " + tran.getPosition().lng;
            //document.getElementById("infoTowardsPosition").innerHTML = "På vei til: " + tran.getTowardsPosition();
            //document.getElementById("infoLastPosition").innerHTML = "Forrige Pos: " + tran.getLastPosition();
            //document.getElementById("infoOriginId").innerHTML = "StartId: " + tran.getOriginId();
            document.getElementById("infoOriginName").innerHTML = "StartNavn: " + tran.getOriginName();
            //document.getElementById("infoDestinationId").innerHTML = "DestinasjonsId: " + tran.getDestinationId();
            document.getElementById("infoDestinationName").innerHTML = "DestinasjonsNavn: " + tran.getDestinationName();
            document.getElementById("infoHeadingTo").innerHTML = "NesteStopp: " + getStopNameFromId(selectedMarkerRoute, tran.getHeadingTo());
            document.getElementById("infoHeadingFrom").innerHTML = "SistStopp: " + getStopNameFromId(selectedMarkerRoute, tran.getHeadingFrom());
            
            var changeSecond = Math.abs((new Date() - tran.getArrivalTime())/1000);
            document.getElementById("infoTimeLeft").innerHTML = "Tid igjen: " + changeSecond + " sekunder";
        }
    }
}

function print(text)
{
    console.log(text);
    document.getElementById("infoConsole").innerHTML = text;
}

function updateDropdown()
{
    var selectRoute = document.getElementById("selectRoute");
    var selectTransport = document.getElementById("selectTransport");
    
    if(ROUTE_MANAGER.length != selectRoute.length)
    {
        $('#selectRoute').empty()

        for(var i = 0; i < ROUTE_MANAGER.length; i++)
        {
            var valg = document.createElement("option");
            valg.text = ROUTE_MANAGER[i].getId();
            valg.value = i;
            selectRoute.add(valg);
        }
    }
    
    onChangeRoute();
}

function onChangeRoute()
{
    if(ROUTE_MANAGER.length > 0)
    {
        var transportArr = ROUTE_MANAGER[selectRoute.options[selectRoute.selectedIndex].value].getTransport();

        if(transportArr != null && transportArr.length > 0)
        {
            if(transportArr.length != selectTransport.length)
            {
                $('#selectTransport').empty()
                for(var i = 0; i < transportArr.length; i++)
                {
                    var valg = document.createElement("option");
                    valg.text = transportArr[i].getId();
                    valg.value = i;
                    selectTransport.add(valg);
                }
            }
        }
    }
    
    updateSelected();
}
  
function onChangeTransport()
{
    updateSelected();  
}

function updateSelected()
{
    var selectRoute = document.getElementById("selectRoute");
    var selectTransport = document.getElementById("selectTransport");
    
    if(selectRoute.length > 0 && selectTransport.length > 0)
    {
        if(selectedMarkerRoute != null)
            changeIcon( ROUTE_MANAGER[selectedMarkerRoute].getTransport()[selectedMarkerTransport], ikoner.buss);
        
        selectedMarkerRoute = selectRoute.options[selectRoute.selectedIndex].value;
        selectedMarkerTransport = selectTransport.options[selectTransport.selectedIndex].value;
        
        changeIcon( ROUTE_MANAGER[selectedMarkerRoute].getTransport()[selectedMarkerTransport], ikoner.buss_selected);
    }
}

function setSelected(routeIndex, transportIndex)
{
    // Rydde opp i repitesjon senere yo
    var selectRoute = document.getElementById("selectRoute");
    var selectTransport = document.getElementById("selectTransport");
    
    if(routeIndex != null && transportIndex != null)
    {
        selectRoute.value = routeIndex;
        selectTransport.value = transportIndex;
    }
}