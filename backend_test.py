#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Fonoaudiologia App
Tests all major endpoints including auth, exercises, therapy plans, appointments, and progress
"""

import requests
import sys
import json
from datetime import datetime, timezone, timedelta
from typing import Dict, Any, Optional

class FonoAudiologiaAPITester:
    def __init__(self, base_url="https://fonomed.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.session_token = None
        self.user_data = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name}: PASSED")
        else:
            print(f"❌ {name}: FAILED - {details}")
        
        self.test_results.append({
            "test_name": name,
            "success": success,
            "details": details,
            "response_data": response_data
        })

    def run_test(self, name: str, method: str, endpoint: str, expected_status: int, 
                 data: Optional[Dict] = None, headers: Optional[Dict] = None) -> tuple:
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        
        # Default headers
        req_headers = {'Content-Type': 'application/json'}
        if self.session_token:
            req_headers['Authorization'] = f'Bearer {self.session_token}'
        if headers:
            req_headers.update(headers)

        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=req_headers, timeout=30)
            elif method == 'POST':
                if isinstance(data, dict) and req_headers.get('Content-Type') == 'application/json':
                    response = requests.post(url, json=data, headers=req_headers, timeout=30)
                else:
                    # For form data
                    response = requests.post(url, data=data, headers={k:v for k,v in req_headers.items() if k != 'Content-Type'}, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=req_headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=req_headers, timeout=30)

            success = response.status_code == expected_status
            
            try:
                response_json = response.json()
            except:
                response_json = {"raw_response": response.text}

            if success:
                self.log_test(name, True, f"Status: {response.status_code}", response_json)
            else:
                self.log_test(name, False, f"Expected {expected_status}, got {response.status_code}. Response: {response.text[:200]}", response_json)

            return success, response_json

        except Exception as e:
            self.log_test(name, False, f"Exception: {str(e)}")
            return False, {}

    def test_user_registration(self):
        """Test user registration"""
        test_email = f"test_user_{datetime.now().strftime('%Y%m%d_%H%M%S')}@test.com"
        form_data = {
            'email': test_email,
            'password': 'senha123',
            'name': 'Test User'
        }
        
        success, response = self.run_test(
            "User Registration",
            "POST",
            "/auth/register",
            200,
            data=form_data
        )
        
        if success:
            self.test_email = test_email
            self.test_password = 'senha123'
            return True
        return False

    def test_user_login(self):
        """Test user login with test credentials"""
        # Try with provided test credentials first
        form_data = {
            'email': 'paciente@test.com',
            'password': 'senha123'
        }
        
        success, response = self.run_test(
            "User Login (Test Credentials)",
            "POST", 
            "/auth/login",
            200,
            data=form_data
        )
        
        if success and 'user' in response:
            self.user_data = response['user']
            # Extract session token from cookies if available
            print(f"   Logged in as: {self.user_data.get('name', 'Unknown')}")
            return True
        
        # If test credentials fail, try with registered user
        if hasattr(self, 'test_email'):
            form_data = {
                'email': self.test_email,
                'password': self.test_password
            }
            
            success, response = self.run_test(
                "User Login (Registered User)",
                "POST",
                "/auth/login", 
                200,
                data=form_data
            )
            
            if success and 'user' in response:
                self.user_data = response['user']
                return True
        
        return False

    def test_get_me(self):
        """Test getting current user info"""
        success, response = self.run_test(
            "Get Current User",
            "GET",
            "/auth/me",
            200
        )
        
        if success:
            self.user_data = response
            return True
        return False

    def test_exercises_api(self):
        """Test exercises endpoints"""
        # Get all exercises
        success, exercises = self.run_test(
            "Get All Exercises",
            "GET",
            "/exercises",
            200
        )
        
        if success and isinstance(exercises, list):
            print(f"   Found {len(exercises)} exercises")
            
            # Test filtering by category if exercises exist
            if exercises:
                # Get unique categories
                categories = list(set(ex.get('category', '') for ex in exercises if ex.get('category')))
                if categories:
                    category = categories[0]
                    self.run_test(
                        f"Filter Exercises by Category ({category})",
                        "GET",
                        f"/exercises?category={category}",
                        200
                    )
                
                # Test getting specific exercise
                exercise_id = exercises[0].get('id')
                if exercise_id:
                    self.run_test(
                        "Get Specific Exercise",
                        "GET",
                        f"/exercises/{exercise_id}",
                        200
                    )
            
            return True
        return False

    def test_therapy_plans_api(self):
        """Test therapy plans endpoints"""
        success, plans = self.run_test(
            "Get Therapy Plans",
            "GET",
            "/therapy-plans",
            200
        )
        
        if success:
            print(f"   Found {len(plans) if isinstance(plans, list) else 0} therapy plans")
            
            # Test getting specific plan if any exist
            if isinstance(plans, list) and plans:
                plan_id = plans[0].get('id')
                if plan_id:
                    self.run_test(
                        "Get Specific Therapy Plan",
                        "GET",
                        f"/therapy-plans/{plan_id}",
                        200
                    )
            
            return True
        return False

    def test_appointments_api(self):
        """Test appointments endpoints"""
        success, appointments = self.run_test(
            "Get Appointments",
            "GET",
            "/appointments",
            200
        )
        
        if success:
            print(f"   Found {len(appointments) if isinstance(appointments, list) else 0} appointments")
            return True
        return False

    def test_progress_api(self):
        """Test progress endpoints"""
        success, progress = self.run_test(
            "Get Progress Entries",
            "GET",
            "/progress",
            200
        )
        
        if success:
            print(f"   Found {len(progress) if isinstance(progress, list) else 0} progress entries")
            return True
        return False

    def test_logout(self):
        """Test user logout"""
        success, response = self.run_test(
            "User Logout",
            "POST",
            "/auth/logout",
            200
        )
        
        if success:
            self.session_token = None
            self.user_data = None
            return True
        return False

    def run_all_tests(self):
        """Run comprehensive test suite"""
        print("🚀 Starting Fonoaudiologia API Tests")
        print(f"📍 Base URL: {self.base_url}")
        print("=" * 60)

        # Test registration (optional - creates new user)
        print("\n📝 TESTING USER REGISTRATION")
        self.test_user_registration()

        # Test authentication
        print("\n🔐 TESTING AUTHENTICATION")
        login_success = self.test_user_login()
        
        if login_success:
            self.test_get_me()
        else:
            print("❌ Login failed - skipping authenticated tests")
            return self.generate_report()

        # Test main APIs
        print("\n💪 TESTING EXERCISES API")
        self.test_exercises_api()

        print("\n📋 TESTING THERAPY PLANS API") 
        self.test_therapy_plans_api()

        print("\n📅 TESTING APPOINTMENTS API")
        self.test_appointments_api()

        print("\n📈 TESTING PROGRESS API")
        self.test_progress_api()

        # Test logout
        print("\n🚪 TESTING LOGOUT")
        self.test_logout()

        return self.generate_report()

    def generate_report(self):
        """Generate final test report"""
        print("\n" + "=" * 60)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 60)
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        
        print(f"✅ Tests Passed: {self.tests_passed}")
        print(f"❌ Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        # Show failed tests
        failed_tests = [t for t in self.test_results if not t['success']]
        if failed_tests:
            print(f"\n❌ FAILED TESTS ({len(failed_tests)}):")
            for test in failed_tests:
                print(f"   • {test['test_name']}: {test['details']}")
        
        # Show passed tests
        passed_tests = [t for t in self.test_results if t['success']]
        if passed_tests:
            print(f"\n✅ PASSED TESTS ({len(passed_tests)}):")
            for test in passed_tests:
                print(f"   • {test['test_name']}")

        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "failed_tests": self.tests_run - self.tests_passed,
            "success_rate": success_rate,
            "test_details": self.test_results
        }

def main():
    """Main test execution"""
    tester = FonoAudiologiaAPITester()
    
    try:
        results = tester.run_all_tests()
        
        # Return appropriate exit code
        if results["success_rate"] >= 80:
            print(f"\n🎉 Tests completed successfully! ({results['success_rate']:.1f}% pass rate)")
            return 0
        else:
            print(f"\n⚠️  Some tests failed. Pass rate: {results['success_rate']:.1f}%")
            return 1
            
    except KeyboardInterrupt:
        print("\n\n⏹️  Tests interrupted by user")
        return 1
    except Exception as e:
        print(f"\n💥 Unexpected error: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())