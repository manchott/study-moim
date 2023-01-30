package com.ssafy.peace.api;

import com.ssafy.peace.dto.FreeBoardDto;
import com.ssafy.peace.dto.UserDto;
import com.ssafy.peace.service.JwtTokenService;
import com.ssafy.peace.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
@AllArgsConstructor
public class UserController {
    private Logger logger = LoggerFactory.getLogger(UserController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final UserService userService;

    private final JwtTokenService jwtTokenService;

    // 로그아웃
    @GetMapping("/{userid}/logout")
    public ResponseEntity<?> userRemoveToken(@PathVariable("userid") Integer userId) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            userService.deleRefreshToken(userId);
            resultMap.put("message", SUCCESS);
            status = HttpStatus.ACCEPTED;
        } catch (Exception e) {
            logger.error("로그아웃 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);

    }

    // 토큰 발급
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody UserDto.Info userDto, HttpServletRequest request) throws Exception {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        String token = request.getHeader("refresh-token");
        logger.debug("token : {}, memberDto : {}", token, userDto);
        if (jwtTokenService.checkToken(token)) {
            if (token.equals(userService.getRefreshToken(userDto.getUserId()))) {
                String accessToken = jwtTokenService.createAccessToken("email", userDto.getEmail());
                logger.debug("token : {}", accessToken);
                logger.debug("정상적으로 액세스토큰 재발급!!!");
                resultMap.put("access-token", accessToken);
                resultMap.put("message", SUCCESS);
                status = HttpStatus.ACCEPTED;
            }
        } else {
            logger.debug("리프레쉬토큰 사용불가");
            status = HttpStatus.UNAUTHORIZED;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @Operation(summary = "get user list", description = "사용자 목록 불러오기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/")
    public ResponseEntity<?> userList() {
        try{
//            return new ResponseEntity<>(userService.getUserList(), HttpStatus.OK);
            return new ResponseEntity<>("", HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "user information", description = "사용자 정보")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/{userId}")
    public ResponseEntity<?> userInfo(@Parameter(description="userId") @PathVariable Integer userId) {
        try{
            return new ResponseEntity<>(userService.getUserInfo(userId), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "get study list", description = "사용자가 참여중인 스터디 목록 불러오기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/{userId}/studies")
    public ResponseEntity<?> userStudyList(@Parameter(description="userId") @PathVariable Integer userId) {
        try{
            return new ResponseEntity<>(userService.getStudyList(userId), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "get course list", description = "강좌 수강 내역 불러오기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/{userId}/courses")
    public ResponseEntity<?> userCourseHistoryList(@Parameter(description="userId") @PathVariable Integer userId) {
        try{
            return new ResponseEntity<>(userService.getCourseHistory(userId), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "get lecture list", description = "강의 수강 내역 불러오기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/{userId}/lectures")
    public ResponseEntity<?> userLectureHistoryList(@Parameter(description="userId") @PathVariable Integer userId) {
        try{
            return new ResponseEntity<>(userService.getLectureHistory(userId), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "get memos", description = "사용자 메모 불러오기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/{userId}/memos")
    public ResponseEntity<?> userMemoList(@Parameter(description = "userId") @PathVariable Integer userId) {
        try{
            return new ResponseEntity<>(userService.getMemoList(userId), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "get posting list", description = "작성한 글 내역 불러오기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/{userId}/articles")
    public ResponseEntity<?> userPostingList(@Parameter(description="userId") @PathVariable Integer userId) {
        try{
            return new ResponseEntity<>(userService.getPostList(userId), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "get like list", description = "좋아요 한 강좌 불러오기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/{userId}/likes")
    public ResponseEntity<?> userLikeList(@Parameter(description="userId") @PathVariable Integer userId) {
        try{
            return new ResponseEntity<>(userService.getLikeList(), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
