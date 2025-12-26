
import requests

BASE_URL = "http://localhost:5000/api"

def test_project_upload():
    # 1. Login
    login_payload = {
        "username": "demo",
        "password": "demo@1234"
    }
    try:
        login_res = requests.post(f"{BASE_URL}/login", json=login_payload)
        login_res.raise_for_status()
        token = login_res.json().get("token")
        print("Login successful, token received.")
    except Exception as e:
        print(f"Login failed: {e}")
        return

    # 2. Upload Project with liveLink
    headers = {
        "Authorization": f"Bearer {token}"
    }
    
    # We will simulate multipart form data.
    # We need to send a file to trigger multer logic properly, 
    # although it should handle no file too if the code allows (req.file check).
    
    # Create a dummy image file in memory is hard for 'files' param without actual file?
    # correct way in requests: files={'image': ('filename', open('args', 'rb'), 'type')}
    # We can skip file if backend allows. 
    # Backend: if (req.file) ... else fileUrl = ''.
    
    data = {
        "title": "Python Test Project",
        "description": "Testing liveLink persistence",
        "technologies": "Python, Requests",
        "link": "http://github.com/python/test",
        "liveLink": "http://example.com/live-demo"
    }
    
    try:
        # Sending without 'files' param typically sends application/x-www-form-urlencoded if not specified? 
        # But we want multipart.
        # Requests handles multipart if 'files' is present.
        # If we only have data, does it send multipart? No, default is form-urlencoded.
        # To force multipart without file:
        # files = {'dummy': (None, '')} ? Or simply provide a dummy file.
        
        # Backend expects 'image' field.
        files = {
            'image': ('test.txt', b'dummy content', 'text/plain')
        }
        
        create_res = requests.post(f"{BASE_URL}/projects", headers=headers, data=data, files=files)
        create_res.raise_for_status()
        project = create_res.json()
        print("Project created:", project)
        
        if project.get("liveLink") == "http://example.com/live-demo":
            print("SUCCESS: liveLink matches.")
        else:
            print(f"FAILURE: liveLink mismatch. Got: {project.get('liveLink')}")
            
    except Exception as e:
        print(f"Create project failed: {create_res.text if 'create_res' in locals() else e}")

if __name__ == "__main__":
    test_project_upload()
