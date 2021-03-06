		 var meshes = new Array();
		
		function createShapes(shapeName)
		{
			var colors = [0x99c1cc,0x666633,0x336666,0xefd1c9];
		 var color = colors[Math.floor(Math.random()*colors.length)];
		 
			var shape;
			switch (shapeName) 
			{
				case "CUBE":
						var cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
						var cubeMaterial = new THREE.MeshBasicMaterial({
						color: color,wireframe: true
						});
						shape = new THREE.Mesh(cubeGeometry, cubeMaterial);
					break;
				case "TORUSKNOT" :
						var torusKnotGeometry = new THREE.TorusKnotGeometry( 3, 1, 20, 20); 
						var torusKnotMaterial = new THREE.MeshBasicMaterial({
							color: color,wireframe: true
						});
						var torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);

						torusKnot.position.x = -10;
						torusKnot.position.y = 5;
						torusKnot.position.z = 2.5;
						torusKnot.castShadow = true;
						shape = torusKnot;
					break;
				case "RING" :

						var geometry = new THREE.RingGeometry( 1, 5, 10);
						var material = new THREE.MeshBasicMaterial( { color: color,wireframe: true } );
						shape =  new THREE.Mesh(geometry, material);
					break;
				case "CYLINDER" :
						var cylinder = new THREE.CylinderGeometry( 5, 5, 10, 5 );
						var material = new THREE.MeshBasicMaterial( { color: color ,wireframe: true} );
						shape = new THREE.Mesh(cylinder, material);
					break;
			}
			meshes.push( shape);
			return shape;
		}
		
		$(function(){
    
    var scene, camera, renderer;
    var controls, guiControls, datGUI;

    var sphereGeometry,  planeGeometry;
    var torMaterial, planeMaterial;
    var torusKnot, plane, torusLine;
    var stats;
    var sphereMaterialLineBasic, sphereMaterialDashed;
    var SCREEN_WIDTH, SCREEN_HEIGHT;
    var ani = 0
    var line;
	var shapes = ["RING","CUBE","CYLINDER","TORUSKNOT"];
	var colors = [0x99c1cc,0x666633,0x336666,0xefd1c9,0xc83652,0xc83652,0xc83652,0xfa8536];
function init(){    
        /*creates empty scene object and renderer*/
        scene = new THREE.Scene();
        camera =  new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 500);
        renderer = new THREE.WebGLRenderer({
			  alpha: true // remove canvas' bg color
			});
        
        renderer.setClearColor(0x000000);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled= true;
        renderer.shadowMapSoft = true;
        
        /*add controls*/
        controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.addEventListener( 'change', render );

        var geometry = new THREE.BoxGeometry(1,1,1);
			/*geometry.vertices.push(new THREE.Vector4(0, 2.5, 0));
			geometry.vertices.push(new THREE.Vector4(0, -1, 0));
			geometry.vertices.push(new THREE.Vector4(0, -1, 0));
			geometry.vertices.push(new THREE.Vector4(2, -2, 0));
			geometry.vertices.push(new THREE.Vector4(2, -2, 0));
			geometry.vertices.push(new THREE.Vector4(2, 1, 2));
			geometry.vertices.push(new THREE.Vector4(2, 1, 2));
			geometry.vertices.push(new THREE.Vector4(0, 2.5, 0));
			geometry.vertices.push(new THREE.Vector4(0, 2.5, 0));
			geometry.vertices.push(new THREE.Vector4(-3, 2.5, 0));
			geometry.vertices.push(new THREE.Vector4(-3, 2.5, 0));
			geometry.vertices.push(new THREE.Vector4(-3, -1, 0));
			geometry.vertices.push(new THREE.Vector4(-1, 0, 0));
			geometry.vertices.push(new THREE.Vector4(-3, 2.5, 0));
			geometry.vertices.push(new THREE.Vector4(-3, 2.5, 2));
			geometry.vertices.push(new THREE.Vector4(-3, 2.5, 2));
			geometry.vertices.push(new THREE.Vector4(2, 1, 2));
			geometry.vertices.push(new THREE.Vector4(-3, 2.5, 2));
			geometry.vertices.push(new THREE.Vector4(-1, -2, 2));
			geometry.vertices.push(new THREE.Vector4(-1, -2, 2));
			geometry.vertices.push(new THREE.Vector4(2, -2, 0));
			geometry.vertices.push(new THREE.Vector4(-1, -2, 2));
			geometry.vertices.push(new THREE.Vector4(-3, -1, 0));*/
			var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
			
			line = new THREE.Mesh(geometry, material);
			
			//scene.add(line);
            
        camera.position.x = 10;
        camera.position.y = 20;
        camera.position.z = 10; 
        camera.lookAt(scene.position);
        
        /*datGUI controls object*/
        GUIControls = new function(){
        /*geo  position*/
			this.rotationX  = 0.00;
			this.rotationY  = 0.01;
			this.rotationZ  = 0.00;
			
			this.postionX = -5;
			this.postionY = 2;
			this.postionZ = 5;
        }
        

        

        /*adds controls to scene*/
        datGUI = new dat.GUI();
        var rotFolder = datGUI.addFolder('Rotation  Options');
        var materialFolder = datGUI.addFolder('Material Options');
        materialFolder.open();
        
        rotFolder.add(GUIControls, 'rotationX',0,1);
        rotFolder.add(GUIControls, 'rotationY',0,1);    
        rotFolder.add(GUIControls, 'rotationZ',0,1);
		 rotFolder.add(GUIControls, 'postionX',-10,10);
		  rotFolder.add(GUIControls, 'postionY',-10,10);
		   rotFolder.add(GUIControls, 'postionZ',-10,10);
      
    datGUI.close();
        $("#body").append(renderer.domElement);
        
    }

		function render() 
		{
			scene.traverse(function(value){
			if (value instanceof THREE.Mesh)
			{   
				value.rotation.x += GUIControls.rotationX;
				value.rotation.y += GUIControls.rotationY;
				value.rotation.z += GUIControls.rotationZ;
				
			
				/*if(value.position.x > 2)
					value.position.x +=0.1;
				else if(value.position.x < 0)
					value.position.x -=0.1;
				if(value.position.z > 2)
					value.position.z +=0.1;
				else if(value.position.z < 0)
						value.position.z -=0.1;
					*/
			}
			});
			if(scene.children.length > 50)
				//deleteShape();
			renderer.render( scene, camera );
		}
		
	function deleteShape(){
		console.log("I am deleting");
        var arrayText = scene.children;
        var firstShapeAdded = arrayText[3];
        if (firstShapeAdded instanceof THREE.Mesh){
            scene.remove(firstShapeAdded);
            //addText.textCount = scene.children.length;
        }
    }
    function animate(){
			requestAnimationFrame( animate );

			/*
			for (var i = 0; i < meshes.length; i++) 
			{
				//console.log(i);
				//scene.add(meshes[i]);
				meshes[i].rotation.x += GUIControls.rotationX;
				meshes[i].rotation.y += GUIControls.rotationY;
				
				
				meshes[i].position.x += 0.1;
				//meshes[i].position.y -= 0.1;
				camera.updateProjectionMatrix ()
				if(i > meshes.length/2)
					meshes[i].position.x -=0.1;
				//if(meshes[i].position.x > 1 )
				 // meshes[i].position.x -=0.1;
			}
			*/
			render();
			renderer.render(scene, camera);

    
    }
	
	 
		$("#body").click(function(){
	var r = Math.random() + 0.5;
		 var geometry = new THREE.BoxGeometry(1,1,1);
		 //console.log(Math.floor(Math.random()*colors.length));
		 var color = colors[Math.floor(Math.random()*colors.length)];
		 var shape = shapes[Math.floor(Math.random()*shapes.length)];
		 var material = new THREE.LineBasicMaterial({ color: color });
			
		cube = createShapes(shape);
		var pos  = Math.random();
		cube.position.x = pos;
		cube.position.y = pos;
		cube.position.z = pos;
		//scene.add(cube);
	});
	
	
	$("#add").click(function(){
	var i = 1;
	
		var r = Math.random() + 0.5;
		var geometry = new THREE.BoxGeometry(1,1,1);
		var color = colors[Math.floor(Math.random()*colors.length)];
		var shape = shapes[Math.floor(Math.random()*shapes.length)];
		var material = new THREE.LineBasicMaterial({ color: color });

		cube = createShapes(shape);
		var pos  = Math.random();
		cube.position.x =  Math.floor(Math.random()*50) - 25;
		cube.position.y =  Math.floor(Math.random()*50) - 25;
		cube.position.z =  Math.floor(Math.random()*50) - 25;
		scene.add(cube);
		
	});



	
    init(); 
    animate();
    
}); 
