/**
 * Register event listeners so that we can perform processing
 * when certain events are fired
 */
function registerListener(stepObject) {
	/*
	 * the 'beforeSaveNodeState' event is fired right before a node
	 * state is saved. this allows you to access the student work
	 * that the student submitted. it also allows you to modify the 
	 * node state before it's saved to the server.
	 */
	eventManager.subscribe('beforeNodeStateSaved', beforeSaveNodeStateListener, stepObject);
}


/**
 * Called when the 'beforeSaveNodeState' event is fired
 * @param type the event name
 * @param args the arguments that are provided when the event is fired
 * @param obj the object that is provided when this function is subscribed to the event
 */
function beforeSaveNodeStateListener(type, args, obj) {
	//debugger;
	//get the step object
	var stepObject = obj;
	
	//get the node id
	var nodeId = args[0];
	
	//get the node state
	var nodeState = args[1];
    
    if(stepObject.node.id == nodeId) {
        var trials = stepObject.node.trials;
        
        if (trials != null) {
            /*
             * make a copy of the trials and set it into the node state. we need
             * to make a copy of the trials so that the trials don't get updated
             * later in this old node state.
             */
            nodeState.trials = JSON.parse(JSON.stringify(trials));
        }
    }
}